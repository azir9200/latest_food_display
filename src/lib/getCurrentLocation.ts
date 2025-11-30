export const getCurrentLocation = (): Promise<{
  lat: number;
  lng: number;
  locationName: string;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();

          const locationName =
            data.address.city ||
            data.address.town ||
            data.address.suburb ||
            "Unknown location";

          resolve({
            lat: latitude,
            lng: longitude,
            locationName,
          });
        } catch (error: any) {
          console.log(error);
          resolve({
            lat: latitude,
            lng: longitude,
            locationName: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
          });
        }
      },

      () => reject("Location access denied")
    );
  });
};
