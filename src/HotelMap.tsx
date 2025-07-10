import { useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/styles';
import L from 'leaflet';
import hotelData from './seattle_hotel_data.json';

interface Hotel {
  hotel_id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  star_rating: number;
  price_per_night: number | string;
  currency: string;
  rating: number;
  review_count: number;
  image_url: string;
  room_type: string;
  amenities: string[];
}

const hotels: Hotel[] = hotelData as Hotel[];

export default function HotelMap() {
  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={[47.6097, -122.3331]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <MarkerClusterGroup>
          {hotels.map((hotel) => (
            <Marker
              key={hotel.hotel_id}
              position={[hotel.latitude, hotel.longitude]}
            >
              <Popup>
                <div style={{ maxWidth: 200 }}>
                  <img
                    src={hotel.image_url}
                    alt={hotel.name}
                    style={{ width: '100%', marginBottom: '0.5rem', borderRadius: '4px' }}
                  />
                  <strong>{hotel.name}</strong><br />
                  {hotel.address}<br />
                  ⭐ {hotel.star_rating} stars | 💬 {hotel.review_count} reviews<br />
                  💲{hotel.price_per_night} {hotel.currency}<br />
                  🛏️ {hotel.room_type}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}