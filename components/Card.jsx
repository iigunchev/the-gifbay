import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { HeartIcon } from '@heroicons/react/solid';

const Card = ({
  id = '',
  image = '',
  title = '',
  tags = [],
  favorite = false,
  onClickFavorite = () => null
}) => (
  <Link href={`/images/${id}`}>
    <a className="block w-full max-w-xs border-2 rounded-xl p-4">
      <div className="relative ">
        <div className="w-full mb-2 text-gray-700 font-semibold leading-tight">
          {title ?? ''}
        </div>
        <div className="relative h-56">
          {image ? (
            <Image
              src={image}
              alt={title}
              objectFit="cover"
              layout="fill"
              className="hover:opacity-80 transition"
            />
          ) : null}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (typeof onClickFavorite === 'function') {
              onClickFavorite(id);
            }
          }}
          className="absolute top-8 right-2"
        >
          <HeartIcon
            className={`w-7 h-7 drop-shadow-lg transition ${
              favorite ? 'text-red-500' : 'text-white'
            }`}
          />
        </button>
      </div>
      <section className="mt-2 flex flex-wrap gap-2 text-gray-500">
        {tags &&
          tags.map((tag, index) => (
            <span className="bg-slate-200 rounded-full px-2 py-1 text-xs" key={index}>
              {tag}
            </span>
          ))}
      </section>
    </a>
  </Link>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.array,
  favorite: PropTypes.bool,
  onClickFavorite: PropTypes.func
};

export default Card;
