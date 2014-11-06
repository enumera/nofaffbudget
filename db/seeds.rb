# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

b = Budget.create(name: "MyBudget")
Category.create(name: "Food")
Category.create(name: "Fun")

w = WeeklyBudget.create(current_fund: 100, start_fund: 100, weekno: 1)
w.budget = b
w.save





