import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDelCons } from '../../actions/actionDelCons';
import cs from './component.pcss';

const placeholder = document.createElement('li');
placeholder.className = cs.placeholder;

class secondList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      id: '',
    };
  }

  componentWillMount() {
    this.props.dispatch2(this.state.value, Date.now());
  }

  editing2(item, e) {
    const newValue = e.target.value;
    const items = this.props.items2;
    const index = items.indexOf(item);
    items[index].name = newValue;
    this.props.dispatchUpdate2(this.state.value);

    if (newValue === '') {
      this.props.sendDelete2(item.id);
    }

    if (index === this.props.items2.length - 1) {
      this.props.dispatch2(this.state.value, Date.now());
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
    const data = this.props.items2;
    if (from < to) to -= 1;
    data.splice(to, 0, data.splice(from, 1)[0]);

    return this.props.dispatchUpdate2(this.state.value);
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
      <div className={cs.content}>
        <p className={cs.dnd}>Drag and Drop items inside List</p>
        <ul onDragOver={this.dragOver.bind(this)}>
          {this.props.items2.map((item, i) => {
            return (
              <li
                data-id={i}
                key={item.id}
                draggable="true"
                onDragEnd={this.dragEnd.bind(this)}
                onDragStart={this.dragStart.bind(this)}
              ><span>{i + 1}. </span>
                <input
                  onChange={this.editing2.bind(this, item)}
                  value={item.name}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

secondList.propTypes = {
  dispatch2: PropTypes.func.isRequired,
  dispatchUpdate2: PropTypes.func.isRequired,
  sendDelete2: PropTypes.func.isRequired,
  items2: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
  return {
    items2: state.secondList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch2: (name, ky) => {
      dispatch({ type: 'ADD_TODO_CONS', name, ky });
    },
    dispatchUpdate2: (name, body, email, ky) => {
      dispatch({ type: 'UPDATE_CONS', name, body, email, ky });
    },
    sendDelete2: (num) => {
      dispatch(actionDelCons(num));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(secondList);
