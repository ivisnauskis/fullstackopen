import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  const mockLikeHandler = jest.fn();

  const blog = {
    title: "test blog",
    author: "testAuthor",
    likes: 0,
    url: "http://blog.com",
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} handleLike={mockLikeHandler} />);
  });

  test("at start only blog title and author are displayed", () => {
    const div = component.container.querySelector(".expandedView");
    expect(div).toBeNull();
  });

  test("after clicking the button, expanded view is shown", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const div = component.container.querySelector(".expandedView");
    expect(div).toBeDefined();
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });

  test("clicking like twice calls handleLike twice", () => {
    const viewButton = component.getByText("view");
    fireEvent.click(viewButton);

    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });
});
