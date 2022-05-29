import axios from 'axios';
import Layout from '../components/Layout';
import ListingForm from '../components/ListingForm';

const Create = () => {
  const addImage = data => axios.post('/api/images', data);

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Upload your images</h1>
        <p className="text-gray-500">
          Fill out the form below to upload an image.
        </p>
        <div className="mt-8">
          <ListingForm
            buttonText="Upload"
            redirectPath="/"
            onSubmit={addImage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Create;
