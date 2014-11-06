class AddEndDateToWeeklyBudget < ActiveRecord::Migration
  def change
    add_column :weekly_budgets, :end_date, :date
  end
end
