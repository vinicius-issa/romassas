import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, {  mount } from 'enzyme'
import Menu from '../components/elements/Menu';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
describe('Testing Menu Component', ()=>{
    it('should render Menu with Login Button if user is not logged', () => {
        const wrapper = mount(
            <Menu/>
        );
        expect(wrapper.html()).toMatchSnapshot();
    });
});

