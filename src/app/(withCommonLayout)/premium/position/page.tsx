// import Subscription from "@/components/premium/Subscription";

import Subscription from "@/components/premium/Subscription";
import { subscription } from "@/services/AuthService";

const YourPremium = async () => {
  const payment = await subscription();
  return (
    <div>
      <Subscription payment={payment.data} />
    </div>
  );
};

export default YourPremium;
