class HomeController < ApplicationController

  def index

    @categories = Category.all
    @week_budget = WeeklyBudget.last
    @transactions = @week_budget.transactions.all

  end

end
