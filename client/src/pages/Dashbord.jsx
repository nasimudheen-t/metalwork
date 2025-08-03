import Card from '../components/Card';
import MetalRateViewer from '../components/MetalRateViewer';
import RateForm from '../components/Rate';

const Dashbord = () => {
  return (
    <div className="container py-4">

      <div className="row mb-4">
        <div className="col-12">
          <h2 className="text-center">Create Order</h2>
        </div>
      </div>

      
      <div className="row mb-5 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <RateForm />
        </div>
      </div>

  
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mt-5">Order List</h2>
        </div>
        <div className="col-12">
          <Card />
        </div>
      </div>
      <div>
        <MetalRateViewer/>
      </div>
    </div>
  );
};

export default Dashbord;
