import React from 'react'

export default ({tags})=>{
    return(
      <div>
        <i className="fa fa-tags">Tags: </i>
        {tags.map((tag,i) =><a key={i}><span key={i} className='badge badge-info'>{tag}</span></a>)}
      </div>
    )
}