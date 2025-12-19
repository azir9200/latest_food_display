// import Subscription from "@/components/premium/Subscription";

import Subscription from "@/components/premium/Subscription";
import { subscription } from "@/services/AuthService";

const YourPremium = async () => {
  const payment = await subscription();
  return (
    <div>
      <Subscription payment={payment.data} />
      <p>
        Developer is working on it. Please come back later to visit this page
      </p>
    </div>
  );
};

export default YourPremium;
