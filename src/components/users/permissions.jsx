import React,{useParams} from 'react'

const Permissions = () => {
  const {role_id} =useParams()
  const permissions = async()=>{
    const data = await Get_permissions_by_role_id(role_id)
    return data.data
  }
  const { data:permission_data } = useQuery(
    { 
    queryKey: ["permissions",role_id],
     queryFn:permissions,
    }) 
  return (
    <div>
      {
        
      }
    </div>
  )
}

export default Permissions