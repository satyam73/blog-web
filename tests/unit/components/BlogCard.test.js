import '@testing-library/jest-dom';
import Image from 'next/image';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BlogCardPresentation from '@/app/components/blogs/BlogCard/BlogCardPresentation';

describe('Unit: BlogCard component', () => {
  const mockedFunction = jest.fn();
  it('should render the component', () => {
    render(<BlogCardPresentation
      title={'This is dummy title'}
      image={'https://dummyimage.xyz'}
      onClick={mockedFunction}
    />);

    const blogCard = screen.getByTestId('blog-card');
    const title = screen.getByRole('heading');
    const imageContainer = screen.getByTestId('blog-card-image-container')
    const image = screen.getByRole('img');
    const encodedUrl = encodeURIComponent('https://dummyimage.xyz');
    expect(blogCard).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(imageContainer).toBeInTheDocument();
    expect(image).toBeInTheDocument();

    expect(title).toHaveTextContent('This is dummy title');

    expect(image).toHaveAttribute('src', `/_next/image?url=${encodedUrl}&w=384&q=75`);
  });

  it('should call the function', () => {
    render(<BlogCardPresentation
      title={'This is dummy title'}
      image={'https://dummyimage.xyz'}
      onClick={mockedFunction}
    />);

    const blogCard = screen.getByTestId('blog-card');

    fireEvent.click(blogCard);

    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
})
