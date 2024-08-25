// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import initialData from '../data/initialData.json';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialData,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { widgetId } = action.payload;
      state.categories.forEach(category => {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      });
    }
  }
});

export const { addWidget, removeWidget } = dashboardSlice.actions;

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer
  }
});
