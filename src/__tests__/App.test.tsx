import React from 'react';
import App from '../App';
import Enzyme, {  mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Menu from '../components/elements/Menu';
import Alert from '../components/elements/Alert';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore();

const store = mockStore({errorMessage:{
  errorMessage: '',
}});

describe('Testing App Component', () => {
  it('should render App', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper.find(Menu)).toHaveLength(1);
    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
