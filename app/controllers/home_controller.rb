class HomeController < ApplicationController

  def index

    @categories = Category.all
    @week_budget = WeeklyBudget.last
    @transactions = Transaction.where(weekly_budget_id: @week_budget[:id])

  end

end
