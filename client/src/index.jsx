import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    $.get('/similaritems', items => {
      this.setState({
        isLoaded: true,
        items: items.items
      });
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <h2 className="a-color-state">Compare with similar items</h2>
          <br />
          <div className="a-tab-container">
            {/*<h3>Similar Items</h3>*/}
            <div className="a-box-inner">
              <table className="a-bordered a-horizontal-stripes a-spacing-none a-size-base comparison_table">
                <tbody>

                  <tr className="comparison_table_image_row">
                    <th className="min-width-120">&nbsp; </th>
                    {items.map(item => (
                      <th id={'itemBox-' + items.indexOf(item)} key={item._id}>
                        <img src={item.imageSrc} />
                        <div id={'itemTitle-' + items.indexOf(item)} className="comparison_title">
                          {item.product}
                        </div>
                      </th>
                    ))}
                  </tr>

                  <tr className="comparison_add_to_cart_buttons">
                    <td className="min-width-120">&nbsp; </td>
                    {items.map(item => (
                      <td id={'itemButton-' + items.indexOf(item)}>
                        <button>Add to Cart</button>
                      </td>
                    ))}
                  </tr>

                  <tr id="comparison_customer_rating_row">
                    <th className="comparison_attribute_name_column comparison_table_first_col" role="rowheader">
                      Customer Rating
                    </th>
                    {items.map(item => (
                      <td id={'itemRatings-' + items.indexOf(item)}>
                        {item.stars} out of 5 stars ({item.reviews})
                      </td>
                    ))}
                  </tr>

                </tbody>

              </table>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
