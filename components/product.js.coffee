@Product = React.createClass

  getInitialState: ->
    edit: false
    
  handleToggle: (e) ->
    e.preventDefault()
    @setState edit: !@state.edit

  handleEdit: (e) ->
    e.preventDefault()
    data =
      title: ReactDOM.findDOMNode(@refs.title).value
      annotation: ReactDOM.findDOMNode(@refs.annotation).value
    # jQuery doesn't have a $.put shortcut method either
    $.ajax
      method: 'PUT'
      url: "/admin/productcategories/saharnaya-pasta/products/#{ @props.product.id }"
      dataType: 'JSON'
      data:
        product: data
      success: (data) =>
        @setState edit: false
        @props.handleEditProduct @props.product, data

  productRow: ->
    React.DOM.tr null,
      React.DOM.td null, @props.product.title
      React.DOM.td null, @props.product.annotation
      React.DOM.td null, @props.product.labels.enabled
      React.DOM.td null, @props.product.recommendations.products
      React.DOM.td null, @props.product.productcategory
      React.DOM.td null,
        React.DOM.a
          className: 'btn btn-default'
          onClick: @handleToggle
          'Edit'

  productForm: ->
    React.DOM.tr null,
      React.DOM.td null,
        React.DOM.input
          className: 'form-control'
          type: 'text'
          defaultValue: @props.product.title
          ref: 'title'
      React.DOM.td null,
        React.DOM.textarea
          className: 'form-control'
          type: 'text'
          defaultValue: @props.product.annotation
          ref: 'annotation'
      React.DOM.td null,
        React.DOM.a
          className: 'btn btn-default'
          onClick: @handleEdit
          'Update'
        React.DOM.a
          className: 'btn btn-danger'
          onClick: @handleToggle
          'Cancel'                    
          
  render: ->
    if @state.edit
      @productForm()
    else
      @productRow()