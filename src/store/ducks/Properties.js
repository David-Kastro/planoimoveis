import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  SelectProperty     : ["id"],
  FavoriteProperty   : ["id"],
  UnfavoriteProperty : ["id"],
  LoadingProperties  : [],
  SetProperties      : ["properties"],

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
      properties: state.properties.map( property => property.id == action.id && {...property, favorited: true})  
    }
}

const UnfavoriteProperty = ( state = INITIAL_STATE, action ) => {
    return { 
      ...state,
      properties: state.properties.map( property => property.id == action.id && {...property, favorited: false})  
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

export default createReducer( INITIAL_STATE, {
  [Types.SELECT_PROPERTY]     : SelectProperty,    
  [Types.FAVORITE_PROPERTY]   : FavoriteProperty,  
  [Types.UNFAVORITE_PROPERTY] : UnfavoriteProperty,
  [Types.LOADING_PROPERTIES]  : LoadingProperties, 
  [Types.SET_PROPERTIES]      : SetProperties
})