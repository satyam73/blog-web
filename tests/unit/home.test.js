import Home from '@/pages';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';


describe('Unit: Home Page', () => {
  it('should render home heading', () => {
    render(<Home />)
    const heading = screen.getByTestId('home-heading');
    expect(heading).toBeInTheDocument();
  });

});
