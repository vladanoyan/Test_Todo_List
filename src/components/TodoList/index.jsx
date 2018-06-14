import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDel } from '../../actions/actionDel';
import SecondList from './secondList';
import cs from './component.pcss';

const placeholder = document.createElement('li');
placeholder.className = cs.placeholder;

class filterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      id: '',
    };
  }

  componentWillMount() {
    this.props.dispatch(this.state.value, Date.now());
  }

  editing(item, e) {
    const newValue = e.target.value;
    const items = this.props.items;
    const index = items.indexOf(item);
    items[index].name = newValue;
    this.props.dispatchUpdate(this.state.value);

    if (newValue === '') {
      this.props.sendDelete(item.id);
    }

    if (index === this.props.items.length - 1) {
      this.props.dispatch(this.state.value, Date.now());
    }
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }

  dragEnd() {
    if (this.dragged.nodeName !== 'LI') {
      return false;
    }

    this.dragged.style.display = 'block';
    this.dragged.parentNode.removeChild(placeholder);

    const from = Number(this.dragged.dataset.id);
    let to = Number(this.over.dataset.id);
    const data = this.props.items;
    if (from < to) to -= 1;
    data.splice(to, 0, data.splice(from, 1)[0]);

    return this.props.dispatchUpdate(this.state.value);
  }

  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = 'none';
    if (e.target.className === cs.placeholder) return;
    this.over = e.target;
    if (e.target.hasAttribute('data-id')) {
      e.target.parentNode.insertBefore(placeholder, e.target);
    }
  }

  render() {
    return (
      <div className={cs.wrapper}>
        <div className={cs.title}>
          <h2>Should i eat at McDonalds? </h2>
          <div className={cs.List}>
            <h4>PROS</h4>
            <div className={cs.content}>
              <p className={cs.dnd}>Drag and Drop items inside List</p>
              <ul onDragOver={this.dragOver.bind(this)}>
                {this.props.items.map((item, i) => {
                  return (
                    <li
                      data-id={i}
                      key={item.id}
                      draggable="true"
                      onDragEnd={this.dragEnd.bind(this)}
                      onDragStart={this.dragStart.bind(this)}
                    ><span>{i + 1}. </span>
                      <input
                        onChange={this.editing.bind(this, item)}
                        value={item.name}
                        name={item.id}
                        ref={item.id}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={cs.List}>
            <h4>CONS</h4>
            <SecondList />
          </div>
        </div>
      </div>
    );
  }
}

filterList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dispatchUpdate: PropTypes.func.isRequired,
  sendDelete: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.todo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (name, ky) => {
      dispatch({ type: 'ADD_TODO', name, ky });
    },
    dispatchUpdate: (name, body, email, ky) => {
      dispatch({ type: 'UPDATE', name, body, email, ky });
    },
    sendDelete: (num) => {
      dispatch(actionDel(num));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(filterList);
