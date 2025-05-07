 function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;

  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.pow(Math.sin(dLon / 2), 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function sortCountryByDistance(lat, lon, countries) {
  
  return countries.sort((a, b) => {
    const [latA, lonA] = a.latlng || [0, 0];
    const [latB, lonB] = b.latlng || [0, 0];
    const distanceA = calculateDistance(lat, lon, latA, lonA);
    const distanceB = calculateDistance(lat, lon, latB, lonB);
    return distanceA - distanceB;
  });
}
