import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  SelectProperty     : ["id"],
  FavoriteProperty   : ["id"],
  UnfavoriteProperty : ["id"],
  LoadingProperties  : [],
  SetProperties      : ["properties"],
  UnsetProperties    : [],

})

const INITIAL_STATE = { properties: [], selectedProperty: null, loading: false };

const SelectProperty = ( state = INITIAL_STATE, action ) => {
  return { 
    ...state,
    selectedProperty: action.id  
  }
}

const FavoriteProperty = ( state = INITIAL_STATE, action ) => {
    return { 
      ...state,
      properties: state.properties.map( property => property.id == action.id ? {...property, favorited: true} : {...property})
    }
}

const UnfavoriteProperty = ( state = INITIAL_STATE, action ) => {
    return { 
      ...state,
      properties: state.properties.map( property => property.id == action.id ? {...property, favorited: false} : {...property})  
    }
}

const LoadingProperties = ( state = INITIAL_STATE, action ) => {
    return { 
      ...state,
      selectedProperty: null,
      loading: true  
    }
}

const SetProperties = ( state = INITIAL_STATE, action ) => {
  
    return { 
      ...state,
      properties: [...state.properties, ...action.properties],
      loading: false  
    }
}

const UnsetProperties = ( state = INITIAL_STATE, action ) => {
  
  return { 
    ...state,
    properties: [], 
  }
}

export default createReducer( INITIAL_STATE, {
  [Types.SELECT_PROPERTY]     : SelectProperty,    
  [Types.FAVORITE_PROPERTY]   : FavoriteProperty,  
  [Types.UNFAVORITE_PROPERTY] : UnfavoriteProperty,
  [Types.LOADING_PROPERTIES]  : LoadingProperties, 
  [Types.SET_PROPERTIES]      : SetProperties,
  [Types.UNSET_PROPERTIES]    : UnsetProperties
})