import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import AppbarPresentation from '@/components/common/Appbar/AppbarPresentation';
import { APPBAR_ITEMS } from '@/components/common/Appbar/appbar.constant'

describe('Unit: Appbar Component', () => {
  it('should render Appbar component', () => {
    render(<AppbarPresentation />);

    const appbar = screen.getByRole('banner');

    expect(appbar).toBeInTheDocument();

    APPBAR_ITEMS.forEach((item) => {
      const appbarItem = screen.getByTestId(`appbar-item-${item.name}`);
      expect(appbarItem).toBeInTheDocument();
      expect(appbarItem).toHaveTextContent(item.text);
    });
  });


  it('should render Appbar component', () => {
    const onItemClick = jest.fn();
    let activePage = 1;
    render(<AppbarPresentation activePage={activePage} onItemClick={onItemClick} />);

    const activeItem = screen.getByTestId(`appbar-item-${APPBAR_ITEMS[1].name}`);
    expect(activeItem).toHaveClass('main__item--active');
    const notActiveItem = screen.getByTestId(`appbar-item-${APPBAR_ITEMS[0].name}`);
    expect(notActiveItem).not.toHaveClass('main__item--active');

    fireEvent.click(notActiveItem);
    activePage = 0;

    expect(activeItem).not.toHaveClass('main__item--active');
    expect(notActiveItem).toHaveClass('main__item--active');
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
