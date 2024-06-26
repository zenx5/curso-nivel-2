import { NavLink } from "react-router-dom"

export default function ItemComment({post, id, name, email, body}) {

    const renderSlug = () => {
        return `/posts/${post.id}-${post.title.replaceAll(/ /g, '-')}/comments/${id}`
    }

    return <div className="border-l border-slate-400 p-2 ml-10 my-2">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-slate-600">{email}</p>
        <span className="flex flex-row justify-between">
            <p className="text-slate-800">{body.substring(0,30)}...</p>
            <NavLink to={renderSlug()} className="mx-5 hover:underline">Leer mas</NavLink>
        </span>
    </div>
}