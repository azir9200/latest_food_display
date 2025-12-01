// "use client";

// import { Button } from "@/components/ui/button";
// import { getCurrentLocation } from "@/lib/getCurrentLocation";
// import { useState } from "react";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { Input } from "../ui/input";

// interface LocationPickerProps {
//   location: string;
//   setLocation: (value: string) => void;
//   setCoordinates?: (coords: { lat: number; lng: number }) => void;
// }

// const LocationPicker: React.FC<LocationPickerProps> = ({}) => {
//   const [manualLocationOpen, setManualLocationOpen] = useState(false);
//   const [location, setLocation] = useState();
//   const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

//   const [tempValue, setTempValue] = useState("");

//   const handleGetLocation = async () => {
//     try {
//       const loc = await getCurrentLocation();

//       setCoordinates?.({ lat: loc.lat, lng: loc.lng });
//       setLocation(loc.locationName);

//       toast.success(`Location detected: ${loc.locationName}`);
//     } catch (error) {
//       console.log(error);
//       toast.error("Couldn't get your location. Please enter manually.");
//       setManualLocationOpen(true);
//     }
//   };

//   return (
//     <>
//       <Button onClick={handleGetLocation}>📍 Use Current Location</Button>

//       <Dialog open={manualLocationOpen} onOpenChange={setManualLocationOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Enter Your Location</DialogTitle>
//             <DialogDescription>
//               Couldn’t detect your current location. Please enter manually.
//             </DialogDescription>
//           </DialogHeader>

//           <Input
//             value={tempValue}
//             onChange={(e) => setTempValue(e.target.value)}
//             placeholder="e.g. New Market, Dhaka"
//           />

//           <DialogFooter>
//             <Button
//               onClick={() => {
//                 if (tempValue.trim()) setLocation(tempValue);
//                 setManualLocationOpen(false);
//               }}
//             >
//               Done
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default LocationPicker;
