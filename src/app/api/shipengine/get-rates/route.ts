import { shipEngine } from '@/app/helper/shipengine';

// Define courierIds if not exported from shipengine module
const courierIds = ["carrier1", "carrier2"]; // Replace with actual carrier IDs
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { shipToAddress, packages } = await req.json();
    const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipToAddress,
        shipFrom: {
          name: "Your Store Name",
          phone: "555-555-5555",
          addressLine1: "123 Main St",
          cityLocality: "Austin",
          stateProvince: "TX",
          postalCode: "78701",
          countryCode: "US",
          addressResidentialIndicator: "no"
        },
        packages: packages,
      },
      rateOptions: {
        carrierIds: courierIds,
      },
    });

    return NextResponse.json(shipmentDetails, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while fetching rates" }, { status: 500 });
  }
}

