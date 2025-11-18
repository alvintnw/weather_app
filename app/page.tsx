// app/page.tsx
'use client' // Penting karena kita pakai useState

import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS Bootstrap
import { WeatherSearch } from '../app/fonts/actions'; // Import server action
import { WeatherData } from '@/types/weather'; // Import tipe data

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fungsi handle submit form
  const WeatherSearchData = async (formData: FormData) => {
    const city = formData.get('city') as string;
    if (!city) return;

    const data = await WeatherSearch(city);

    if (data) {
      setWeather(data);
      setError(null);
    } else {
      setWeather(null);
      setError("Kota tidak ditemukan atau terjadi kesalahan.");
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Aplikasi Cuaca</h1>

      {/* Form Pencarian */}
      <Row className="justify-content-center">
        <Col md={6}>
          <Form action={WeatherSearchData} className="d-flex gap-2 mb-4">
            <Form.Control 
              type="text" 
              name="city" 
              placeholder="Masukkan nama kota (contoh: Jakarta)" 
              required 
            />
            <SubmitButton />
          </Form>
        </Col>
      </Row>

      {/* Menampilkan Error */}
      {error && (
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {/* Menampilkan Hasil Data Cuaca */}
      {weather && (
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center shadow">
              <Card.Header as="h5">{weather.name}</Card.Header>
              <Card.Body>
                <Card.Title>{weather.main.temp}°C</Card.Title>
                <Card.Text className="text-capitalize">
                  {weather.weather[0].description}
                </Card.Text>
                <img 
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                  alt="icon" 
                />
                <div className="mt-3">
                  <small>Kelembapan: {weather.main.humidity}%</small> <br/>
                  <small>Kecepatan Angin: {weather.wind.speed} m/s</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

// Komponen Submit Button terpisah (Optional tapi good practice)
function SubmitButton() {
  return (
    <Button variant="primary" type="submit">
      Cari
    </Button>
  );
}