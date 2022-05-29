import PropTypes from 'prop-types';
import Card from './Card';
import { ExclamationIcon } from '@heroicons/react/outline';

const Grid = ({ items = [] }) => {
  const isEmpty = items.length === 0;

  const toggleFavorite = async (id) => {
    // TODO: Add/remove home from the authenticated user's favorites
  };

  return isEmpty ? (
    <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.id}
          image={item.image}
          title={item.title}
          tags={item.tags}
        />
      ))}
    </div>
  );
};

Grid.propTypes = {
  gifs: PropTypes.array
};

export default Grid;
