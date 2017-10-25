"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_smart_table_1 = require("ng2-smart-table");
var tour_upsert_component_1 = require("./tour-upsert.component");
var TourListComponent = /** @class */ (function () {
    function TourListComponent(tourService, modalService) {
        this.tourService = tourService;
        this.modalService = modalService;
        this.settings = {
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                id: {
                    title: 'ID',
                    type: 'number',
                },
                firstName: {
                    title: 'First Name',
                    type: 'string',
                },
                lastName: {
                    title: 'Last Name',
                    type: 'string',
                },
                username: {
                    title: 'Username',
                    type: 'string',
                },
                email: {
                    title: 'E-mail',
                    type: 'string',
                },
                age: {
                    title: 'Age',
                    type: 'number',
                },
            },
        };
        this.source = new ng2_smart_table_1.LocalDataSource();
        this.source.load(tourService.getList());
    }
    TourListComponent.prototype.upsert = function () {
        this.modalService.open(tour_upsert_component_1.TourUpsertComponent, { size: "lg", backdrop: "static", container: "nb-layout" });
    };
    TourListComponent = __decorate([
        core_1.Component({
            selector: "tour-list",
            templateUrl: "./tour-list.component.html",
            styleUrls: ["./tour-list.component.scss"]
        })
    ], TourListComponent);
    return TourListComponent;
}());
exports.TourListComponent = TourListComponent;
