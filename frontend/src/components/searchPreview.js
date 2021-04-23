import React from 'react';
import { Link } from 'gatsby';
import { Highlight } from 'react-instantsearch-dom';
// import { css } from '@emotion/core';

const SearchPreview = ({ hit }) => {
//   const categories = hit.categories.map(cat => cat.title);

//   console.log(hit);

  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  return (
    <div className="flex items-start py-2 flex-wrap sm:flex-nowrap">
      <div className="mr-6 flex-grow">
        <Link to={`/article/${hit.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`}>
          <Highlight hit={hit} attribute="title" tagName="mark" className="font-medium mb-2 text-2xl" />
        </Link>
        <p className='mb-1 text-base'>
          {hit.author ?
            <>By <Link to={`/author/${hit.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
              <Highlight hit={hit} attribute="author.name" tagName="mark" />
            </Link></>
            :
            ""
          }
        </p>
        <p>
          {handleDate(hit.published_at)}
        </p>
      </div>
        {hit.image
          ?
          <div className="ml-0 mt-4 sm:mt-0 sm:ml-6">
            <img src={hit.image.publicURL} style={{ maxWidth: '200px' }} alt="" />
          </div>
          :
          ""
        }
    </div>
  );
};
export default SearchPreview;