import React from 'react';
import App from '../App';
import Enzyme, {  mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Alert from '../components/elements/Alert';
import {Alert as AlertMaterial} from '@material-ui/lab';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore();


describe('Testing App Component', () => {
    it('should no render Alert', () => {
        const store = mockStore({errorMessage:{
            errorMessage: '',
        }});
        const wrapper = mount(
            <Provider store={store}>
                <Alert />
            </Provider>
        );

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.find(AlertMaterial)).toHaveLength(0);

    });

    it('should render Alert with Message = "Error Message"', () => {
        const store = mockStore({errorMessage:{
            errorMessage: 'Error Message',
        }});
        const wrapper = mount(
            <Provider store={store}>
                <Alert />
            </Provider>
        );

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.find(AlertMaterial)).toHaveLength(1);
        expect(wrapper.contains('Error Message')).toEqual(true);
    });
});
