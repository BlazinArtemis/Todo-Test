import { mount } from '@vue/test-utils';
import Todo from '../../../src/components/Todo.vue';

describe('Todo.vue', () => {
  async function addTodo(wrapper, text) {
    const input = wrapper.find('input');
    await input.setValue(text);
    await input.trigger('keydown.enter');
  }

  it('filters todos correctly based on selected filter', async () => {
    const wrapper = mount(Todo);

    await addTodo(wrapper, 'Short');
    await addTodo(wrapper, 'This is a long todo');

    wrapper.vm.filter = 'short';
    await wrapper.vm.$nextTick();

    const todoItems = wrapper.findAll('li');
    expect(todoItems).toHaveLength(1);
    expect(todoItems[0].text()).toContain('Short');

    wrapper.vm.filter = 'long';
    await wrapper.vm.$nextTick();

    const longTodoItems = wrapper.findAll('li');
    expect(longTodoItems).toHaveLength(1);
    expect(longTodoItems[0].text()).toContain('This is a long todo');

    wrapper.vm.filter = 'all';
    await wrapper.vm.$nextTick();

    const allTodoItems = wrapper.findAll('li');
    expect(allTodoItems).toHaveLength(2);
  });

  it('adds a todo when entering text and pressing enter', async () => {
    const wrapper = mount(Todo);

    await addTodo(wrapper, 'New todo');

    const todoItems = wrapper.findAll('li');
    expect(todoItems).toHaveLength(1);
    expect(todoItems[0].text()).toContain('New todo');
    expect(wrapper.vm.newTodo).toBe('');
  });

  it('displays an error when trying to add an empty todo', async () => {
    const wrapper = mount(Todo);

    const input = wrapper.find('input');
    await input.setValue('');
    await input.trigger('keydown.enter');

    const error = wrapper.find('.error');
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Todo cannot be empty');

    const todoItems = wrapper.findAll('li');
    expect(todoItems).toHaveLength(0);
  });
});