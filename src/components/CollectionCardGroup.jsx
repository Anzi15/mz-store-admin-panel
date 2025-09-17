import React from 'react'
import CollectionCard from './CollectionCard'

const CollectionCardGroup = ({collectionsArray=[]}) => {
  return (
    <section className="flex w-full justify-around md:gap-4 flex-wrap my-10 font-futura">
       {collectionsArray.map((collection)=>{
        return(
            <CollectionCard image={collection?.image} collectionName={collection?.name} collectionSlug={collection?.slug} />
        )
       })}
    </section>
  )
}

export default CollectionCardGroup
