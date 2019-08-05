import gql from 'graphql-tag'

/* export Query = gql´
  {
  
}
´ */
/* export VariableCostQuery = gql`
  {
  input: model_draft_reeem_osembe_input(where: {year: {_eq: 2050}, version: {_eq: "DataV1R1"}, nid: {_gte: 674, _lte: 740}}) {
    value
    indicator
    nid
    year
    region
    pathway
  }
}
` */

/* export ElectricityProdQuery = gql´
  {
  i1: model_draft_reeem_osembe_output(order_by: {nid: asc}, where: {year: {_eq: 2050}, version: {_eq: "DataV1R1"}, nid: {_gte: 76, _lte: 127}}) {
      value
      indicator
      pathway
      nid
      year
      region
    }
    model_draft_reeem_osembe_output(order_by: {nid: asc}, where: {year: {_eq: 2050}, version: {_eq: "DataV1R1"}, nid: {_gte: 298, _lte: 300}}) {
      value
      indicator
      pathway
      nid
      year
      region
  	}
}
´  */

/* export FuelInputQuery = gql`
  {
  i1: model_draft_reeem_osembe_output(order_by: {nid: asc}, where: {year: {_eq: 2050}, version: {_eq: "DataV1R1"}, nid: {_gte: 128, _lte: 179}}) {
      value
      indicator
      pathway
      nid
      year
      region
    }
    model_draft_reeem_osembe_output(order_by: {nid: asc}, where: {year: {_eq: 2050}, version: {_eq: "DataV1R1"}, nid: {_gte: 301, _lte: 303}}) {
      value
      indicator
      pathway
      nid
      year
      region
  	}
}` */
