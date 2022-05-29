import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { Formik, Form, FieldArray, Field } from 'formik';
import Input from './Input';
import ImageUpload from './ImageUpload';
import { XIcon, PlusIcon } from '@heroicons/react/outline';

const ListingSchema = Yup.object().shape({
  title: Yup.string().required(),
  tags: Yup.array().required()
});

const ListingForm = ({
  initialValues = null,
  redirectPath = '',
  buttonText = 'Submit',
  onSubmit = () => null
}) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? '');

  const upload = async (image) => {
    if (!image) return;

    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading('Uploading...');
      const { data } = await axios.post('/api/image-upload', { image });
      setImageUrl(data?.url);
      toast.success('Successfully uploaded', { id: toastId });
    } catch (e) {
      toast.error('Unable to upload', { id: toastId });
      setImageUrl('');
    } finally {
      setDisabled(false);
    }
  };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading('Submitting...');
      // Submit data
      if (typeof onSubmit === 'function') {
        await onSubmit({ ...values, image: imageUrl });
      }
      toast.success('Successfully submitted', { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error('Unable to submit', { id: toastId });
      setDisabled(false);
    }
  };

  const { image, ...initialFormValues } = initialValues ?? {
    image: '',
    title: '',
    tags: ['funny']
  };

  return (
    <div>
      <div className="mb-8 max-w-md">
        <ImageUpload
          className="py-8"
          initialImage={{ src: image, alt: initialFormValues.title }}
          onChangePicture={upload}
        />
      </div>

      <Formik
        initialValues={initialFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid, values }) => (
          <Form className="space-y-8">
            <div className="space-y-6">
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Extremely funny meme"
                disabled={disabled}
                required
              />
              <FieldArray
                name="tags"
                render={(arrayHelpers) => (
                  <div>
                    <label className="text-gray-600 block mb-2">Tags</label>
                    {values.tags && values.tags.length > 0 ? (
                      values.tags.map((tag, index) => (
                        <div key={index} className="flex align-center gap-2">
                          <Field
                            name={`tags.${index}`}
                            className="shadow-sm rounded-md mt-1 py-1 pl-4 border truncate focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed border-gray-300 focus:border-gray-400 focus:ring-gray-400"
                          />

                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            <XIcon className="w-5 h-5 text-red-400" />
                          </button>

                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                          >
                            <PlusIcon className="w-5 h-5 text-green-500" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        className="hover:bg-gray-200 border transition px-3 py-1 rounded-md shadow-sm"
                        onClick={() => arrayHelpers.push('')}
                      >
                        {/* show this when user has removed all friends from the list */}
                        Add tags
                      </button>
                    )}
                  </div>
                )}
              />
              {/* <Input
                name="tags"
                type="text"
                label="Tags"
                placeholder="Gif, funny, Homer Simpson, reaction..."
                disabled={disabled}
                rows={1}
                required
              /> */}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="bg-rose-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600"
              >
                {isSubmitting ? 'Submitting...' : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ListingForm.propTypes = {
  initialValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.array
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func
};

export default ListingForm;
