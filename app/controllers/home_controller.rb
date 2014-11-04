class HomeController < ApplicationController

  def index

    @categories = Category.all
    @week_budget = WeeklyBudget.last
    @transactions = @week_budget.transactions.all

    @category_hash = {}

    @categories.each do |c|
      sum_value = 0.0
      @transactions.each do |t|
        if t.category_id == c.id
          sum_value = sum_value + t.amount.to_f
          puts c.name
          puts t.amount
        end
        @category_hash[c.name] = sum_value.round(2)
      end
    end
    puts @category_hash
  end

end

