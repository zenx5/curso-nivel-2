import {  useState } from "react"
import List from "../components/List"
import ItemPost from "../components/ItemPost"
import { useData } from "../context/DataProvider"
import Pagination from "../components/Pagination"

const QUANTITY = 10
const PAGEINITIAL = 1


export default function Home() {
  const { posts } = useData()
  const [search, setSearch] = useState('')

  /** States para la paginación ACTUAL */
  const [currentPage, setCurrentPage] = useState(PAGEINITIAL)

  /** Constantes para la paginación */
  const endIndex = QUANTITY * currentPage 
  const startIndex = endIndex - QUANTITY  

  /** Division de los posts */
  const nPosts = posts.slice(startIndex, endIndex)

  /** Total de páginas para la paginación */
  const nPages = Math.ceil(posts.length / QUANTITY)

  const handlerFilter = (value) => {
    setSearch(value.toLowerCase())
  }

  const handlerFilterPosts = (post) => {
    if( search.trim() === '' ) return true
    return post.title.toLowerCase().includes(search)
  }

  const renderTitle = (title) => {
    const items = title.split(search)

    return items.reduce((acc,item, index)=>[
      ...acc,
      item,
      <span key={index} className="bg-yellow-200">{search}</span>
    ],[]).slice(0,-1)
  }



  return (
    <div className="">
        <h1 className="mt-10 font-bold text-xl">Lista de todos nuestros Posts</h1>
        <div className="flex flex-col" data-howdoit="list-post">
            <List onFilter={handlerFilter}>
              { nPosts.filter(handlerFilterPosts).map( post => <ItemPost key={post.id} id={post.id} title={post.title}>{ renderTitle(post.title) }</ItemPost> )}
            </List>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              nPages={nPages}
              postStart={startIndex}
              postEnd={endIndex}
              totalPosts={posts.length}
            
            />
        </div>
    </div>
  )
}