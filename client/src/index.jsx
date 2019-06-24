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
          <h2>Compare items</h2>
          <br />
          <div className="a-tab-container">
            <h3>Similar Items</h3>
            <div className="a-box-inner">
              <table className="a-bordered a-horizontal-stripes a-spacing-none a-size-base comparison_table">
                <tbody>
                  <tr className="comparison_table_image_row">
                    <th className="top-left-table-corner"> </th>
                    {items.map(item => (
                      <th key={item._id}><img src={item.imageSrc} /></th>
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
