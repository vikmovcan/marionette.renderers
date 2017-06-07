import 'bootstrap/dist/css/bootstrap.css'
import './main.scss'
import Marionette from 'backbone.marionette'
import 'backbone.syphon'
import 'backbone-computedfields'
import renderer from 'marionette.renderers/virtual-dom'

Marionette.View.setRenderer(renderer)