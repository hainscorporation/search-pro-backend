/**
 * @file Definition of system constants
 * @author Daniela Cordoba
 */

const Status_Codes = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServer: 500
}

const Councils = [
  {
    name: 'Brisbane City Council'
  },
  {
    name: 'Gold Coast City Council'
  },
  {
    name: 'Redlands City Council'
  }
]

export {
  Status_Codes, 
  Councils
}