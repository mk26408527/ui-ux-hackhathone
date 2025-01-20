// import { shipEngine } from '@/app/helper/shipengine';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { carrierCode: string; trackingNumber: string } }
// ) {
//   const { carrierCode, trackingNumber } = params;

//   try {
//     const trackingInfo = await shipEngine.trackUsingCarrierCodeAndTrackingNumber({
//       carrierCode,
//       trackingNumber
//     });

//     return NextResponse.json(trackingInfo, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "An error occurred while tracking the shipment" }, { status: 500 });
//   }
// }

