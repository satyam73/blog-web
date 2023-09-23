import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NavbarPresentation from '@/components/common/Navbar/NavbarPresentation';
import { NAVBAR_ITEMS } from '@/components/common/Navbar/navbar.constant';

describe('Unit: Navbar Component', () => {
  it('should render Navbar component', () => {
    render(<NavbarPresentation />);

    const navbar = screen.getByRole('navigation');

    expect(navbar).toBeInTheDocument();

    NAVBAR_ITEMS.forEach((item) => {
      const navbarItem = screen.getByTestId(`navbar-item-${item.name}`);
      expect(navbarItem).toBeInTheDocument();
      expect(navbarItem).toHaveTextContent(item.text);
    });
  });
});
