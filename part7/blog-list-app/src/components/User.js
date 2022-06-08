import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import usersService from "../services/usersService"

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    usersService.get(id).then(user => setUser(user))
  }, [])

  if(!user) {
    return null // effect is still loading
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
