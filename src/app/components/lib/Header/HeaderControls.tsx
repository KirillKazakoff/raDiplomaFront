import React from 'react';
import { Badge, Form, Stack } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ControlsIcon from './ControlsIcon';

export default function HeaderControls() {
    return (
        <Stack direction='horizontal' gap={3}>
            <ControlsIcon id='search-expander' cls='header-controls-search' />
            <NavLink to='/cart'>
                <ControlsIcon cls='header-controls-cart'>
                    <Badge className='header-controls-cart-full'>1</Badge>
                </ControlsIcon>
            </NavLink>

            <Form hidden className='header-controls-search-form'>
                <Form.Control placeholder='Поиск' />
            </Form>
        </Stack>
    );
}
