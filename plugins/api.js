import { addLocale } from "core-js";

export default ({ app }, inject) => {
  const api = (target, action, data, other) => {
    target = target.toLowerCase();
    action = action.toLowerCase();
    switch (target) {
      case "user":
        switch (action) {
          case "index":
            return User.index(data, other);
          case "login":
            return User.login(data, other);
          case "logout":
            return User.logout(data, other);
          case "register_district_admin":
            return User.register_district_admin(data, other);
          case "register_tpi_admin":
            return User.register_tpi_admin(data, other);
          case "register_tpi_officer":
            return User.register_tpi_officer(data, other);
          case "register_tpi_cashier":
            return User.register_tpi_cashier(data, other);
          case "get_by_id":
            return User.get_by_id(data, other);
          case "update":
            return User.update(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }
      case "tpi":
        switch (action) {
          case "index":
            return Tpi.index(data, other);
          case "store":
            return Tpi.store(data, other);
          case "delete":
            return Tpi.delete(data, other);
          case "get_by_id":
            return Tpi.get_by_id(data, other);
          case "update":
            return Tpi.update(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }
      case "report":
        switch (action) {
          case "production":
            return Report.production(data, other);
          case "transaction":
            return Report.transaction(data, other);

          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }
      case "district":
        switch (action) {
          case "index":
            return District.index(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }
      case "province":
        switch (action) {
          case "index":
            return Province.index(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }
      case "fish":
        switch (action) {
          case "index":
            return Fish.index(data, other);
          case "store":
            return Fish.store(data, other);
          case "delete":
            return Fish.delete(data, other);
          case "get_by_id":
            return Fish.get_by_id(data, other);
          case "update":
            return Fish.update(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }
      case "fishing_gear":
        switch (action) {
          case "index":
            return Fishing_gear.index(data, other);
          case "store":
            return Fishing_gear.store(data, other);
          case "delete":
            return Fishing_gear.delete(data, other);
          case "get_by_id":
            return Fishing_gear.get_by_id(data, other);
          case "update":
            return Fishing_gear.update(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }
      case "fishing_area":
        switch (action) {
          case "index":
            return Fishing_area.index(data, other);
          case "store":
            return Fishing_area.store(data, other);
          case "delete":
            return Fishing_area.delete(data, other);
          case "get_by_id":
            return Fishing_area.get_by_id(data, other);
          case "update":
            return Fishing_area.update(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }

      case "caught":
        switch (action) {
          case "index":
            return Caught.index(data, other);
          case "store":
            return Caught.store(data, other);
          case "delete":
            return Caught.delete(data, other);
          case "get_by_id":
            return Caught.get_by_id(data, other);
          case "update":
            return Caught.update(data, other);
          case "inquiry":
            return Caught.inquiry(data, other);
          //check
          case "total_production":
            return Caught.total_production(data, other);
          case "total_fisher":
            return Caught.total_fisher(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }
      case "auction":
        switch (action) {
          case "index":
            return Auction.index(data, other);
          case "inquiry":
            return Auction.inquiry(data, other);
          case "store":
            return Auction.store(data, other);
          case "delete":
            return Auction.delete(data, other);
          case "get_by_id":
            return Auction.get_by_id(data, other);
          case "update":
            return Auction.update(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }

      case "transaction":
        switch (action) {
          case "index":
            return Transaction.index(data, other);
          case "store":
            return Transaction.store(data, other);
          case "delete":
            return Transaction.delete(data, other);
          case "get_by_id":
            return Transaction.get_by_id(data, other);
          case "update":
            return Transaction.update(data, other);
          //check
          case "total_buyer":
            return Transaction.total_buyer(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }

      case "fisher":
        switch (action) {
          case "index":
            return Fisher.index(data, other);
          case "store":
            return Fisher.store(data, other);
          case "delete":
            return Fisher.delete(data, other);
          case "get_by_id":
            return Fisher.get_by_id(data, other);
          case "update":
            return Fisher.update(data, other);
          default:
            console.error(
              `Unknown ${target} action : ${action} in '~/plugins/api.js'`
            );
            break;
        }
      case "buyer":
        switch (action) {
          case "index":
            return Buyer.index(data, other);
          case "store":
            return Buyer.store(data, other);
          case "delete":
            return Buyer.delete(data, other);
          case "get_by_id":
            return Buyer.get_by_id(data, other);
          case "update":
            return Buyer.update(data, other);
          default:
            console.error();
            break;
        }
      default:
        console.error(`Unknown target : ${target} in '~/plugins/api.js'`);
        break;
    }
  };

  const User = {
    index() {
      return app.$axios.get("/users").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    //cek
    login(data, strategy) {
      return app.$auth
        .loginWith(strategy, { data })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    logout() {
      return app.$auth
        .logout()
        .then(response => {
          return response;
        })
        .catch(error => {
          throw error.response;
        });
    },

    register_district_admin(data) {
      const body = {
        district_id: parseInt(data.district),
        nik: data.nik,
        name: data.name,
        address: data.address,
        username: data.username
      };

      return app
        .$axios({
          method: "post",
          url: "/auth/create-district-admin",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },

    register_tpi_admin(data) {
      const body = {
        role_id: parseInt(data.role_id),
        tpi_id: parseInt(data.tpi),
        nik: data.nik,
        name: data.name,
        address: data.address,
        username: data.username
      };

      return app
        .$axios({
          method: "post",
          url: "/auth/create-tpi-admin",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },

    register_tpi_officer(data) {
      const body = {
        nik: data.nik,
        name: data.name,
        address: data.address,
        username: data.username
      };

      return app
        .$axios({
          method: "post",
          url: "/auth/create-tpi-officer",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },

    register_tpi_cashier(data) {
      const body = {
        nik: data.nik,
        name: data.name,
        address: data.address,
        username: data.username
      };

      return app
        .$axios({
          method: "post",
          url: "/auth/create-tpi-cashier",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },

    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/user/" + data
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    update(data) {
      const body = {
        user_status_id: parseInt(data.user_status_id),
        role_id: parseInt(data.role_id),
        nik: data.nik,
        name: data.name,
        address: data.address,
        username: data.username,
        password: "mysecret"
      };
      return app
        .$axios({
          method: "put",
          url: "/user/" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const Tpi = {
    index() {
      return app.$axios.get("/tpis").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        name: data.name,
        code: data.code
      };

      return app
        .$axios({
          method: "post",
          url: "/tpi",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        });
    },
    delete(data) {
      const body = {
        id: data
      };
      return app
        .$axios({
          method: "delete",
          url: "/tpi/" + data,
          data: body
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/tpi/" + data
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    update(data) {
      const body = {
        code: data.code,
        name: data.name
      };
      return app
        .$axios({
          method: "put",
          url: "/tpi/" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const Report = {
    production(data) {
      if (data.period == "Laporan Harian") {
        var link =
          "report/production?tpi_id=" + data.tpi + "&daily=" + data.date_daily;
      } else if (data.period == "Laporan Bulanan") {
        var link =
          "report/production?tpi_id=" +
          data.tpi +
          "&monthly=" +
          data.date_monthly;
      } else if (data.period == "Laporan Tahunan") {
        var link =
          "report/production?tpi_id=" +
          data.tpi +
          "&yearly=" +
          data.date_yearly;
      } else if (data.period == "Pilih Jangka Waktu") {
        var link =
          "report/production?tpi_id=" +
          data.tpi +
          "&period=" +
          data.date_custom_from +
          ":" +
          data.date_custom_from;
      }

      return app
        .$axios({
          method: "get",
          url: link
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    transaction(data) {
      if (data.period == "Laporan Harian") {
        var link =
          "report/transaction?tpi_id=" + data.tpi + "&daily=" + data.date_daily;
      } else if (data.period == "Laporan Bulanan") {
        var link =
          "report/transaction?tpi_id=" +
          data.tpi +
          "&monthly=" +
          data.date_monthly;
      } else if (data.period == "Laporan Tahunan") {
        var link =
          "report/transaction?tpi_id=" +
          data.tpi +
          "&yearly=" +
          data.date_yearly;
      } else if (data.period == "Pilih Jangka Waktu") {
        var link =
          "report/transaction?tpi_id=" +
          data.tpi +
          "&period=" +
          data.date_custom_from +
          ":" +
          data.date_custom_from;
      }

      return app
        .$axios({
          method: "get",
          url: link
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const District = {
    index(data) {
      return app
        .$axios({
          method: "get",
          url: "/districts?province_id=" + data
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };
  const Province = {
    index() {
      return app.$axios.get("/provinces").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    }
  };
  const Fish = {
    index() {
      return app.$axios.get("/fish-types").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        name: data.name,
        code: data.code
      };

      return app
        .$axios({
          method: "post",
          url: "/fish-type",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        });
    },
    delete(data) {
      const body = {
        id: data
      };
      return app
        .$axios({
          method: "delete",
          url: "/fish-type/" + data,
          data: body
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/fish-type/" + data
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    update(data) {
      const body = {
        code: data.code,
        name: data.name
      };
      return app
        .$axios({
          method: "put",
          url: "/fish-type/" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const Fishing_gear = {
    index() {
      return app.$axios.get("/fishing-gears").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        code: data.code,
        name: data.name
      };

      return app
        .$axios({
          method: "post",
          url: "/fishing-gear",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        });
    },
    delete(data) {
      const body = {
        id: data
      };
      return app
        .$axios({
          method: "delete",
          url: "/fishing-gear/" + data,
          data: body
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/fishing-gear/" + data
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    update(data) {
      const body = {
        code: data.code,
        name: data.name
      };
      return app
        .$axios({
          method: "put",
          url: "/fishing-gear/" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const Fishing_area = {
    index() {
      return app.$axios.get("/fishing-areas").then(response => {
        console.log(response.data.response_data);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        name: data.name,
        south_latitude_degree: data.south_latitude_degree,
        south_latitude_minute: data.south_latitude_minute,
        south_latitude_second: data.south_latitude_second,
        east_longitude_degree: data.east_longitude_degree,
        east_longitude_minute: data.east_longitude_minute,
        east_longitude_second: data.east_longitude_second
      };

      return app
        .$axios({
          method: "post",
          url: "/fishing-area",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        });
    },
    delete(data) {
      const body = {
        id: data
      };
      return app
        .$axios({
          method: "delete",
          url: "/fishing-area/" + data,
          data: body
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/fishing-area/" + data
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    update(data) {
      const body = {
        name: data.name,
        south_latitude_degree: data.south_latitude_degree,
        south_latitude_minute: data.south_latitude_minute,
        south_latitude_second: data.south_latitude_second,
        east_longitude_degree: data.east_longitude_degree,
        east_longitude_minute: data.east_longitude_minute,
        east_longitude_second: data.east_longitude_second
      };
      return app
        .$axios({
          method: "put",
          url: "/fishing-area/" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const Caught = {
    index(data) {
      if (data.fish == null) {
        data.fish = "0";
      }
      if (data.fisherid == null) {
        data.fisherid = "0";
      }
      if (data.status == null) {
        data.status = "0";
      }
      return app
        .$axios({
          method: "get",
          url:
            "/caughts?fish_type_id=" +
            data.fish +
            "&fisher_id=" +
            data.fisherid +
            "&caught_status_id=" +
            data.status
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },

    store(data) {
      var caught = [];
      for (let index = 0; index < data.caughts.length; index++) {
        caught.push({
          fish_type_id: parseInt(data.caughts[index].fish),
          weight: parseFloat(data.caughts[index].weight),
          weight_unit: data.caughts[index].unit
        });
      }

      const body = {
        fisher_id: parseInt(data.fisherid),
        trip_day: parseInt(data.trip_day),
        fishing_gear_id: parseInt(data.gear),
        fishing_area_id: parseInt(data.area),
        caught_fish_data: caught
      };

      return app
        .$axios({
          method: "post",
          url: "/caught",
          data: body
        })
        .then(response => {
          console.log(response);
          return response;
        });
    },
    delete(data) {
      const body = {
        id: data
      };
      return app
        .$axios({
          method: "delete",
          url: "/caught/delete/" + data,
          data: body
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/caught/getbyid/" + data
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    update(data) {
      const body = {
        fisher_id: parseInt(data.fisher_id),
        trip_day: parseInt(data.trip_day),
        fishing_gear_id: parseInt(data.fishing_gear_id),
        fishing_area_id: parseInt(data.fishing_area_id),
        fish_type_id: parseInt(data.fish_type_id),
        weight: parseFloat(data.weight),
        weight_unit: data.weight_unit
      };
      return app
        .$axios({
          method: "put",
          url: "/caught/update/" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    inquiry(data) {
      if (data.fish == null) {
        data.fish = "0";
      }
      if (data.fisherid == null) {
        data.fisherid = "0";
      }
      return app
        .$axios({
          method: "get",
          url:
            "/caught/inquiry?fisher_id=" +
            data.fisherid +
            "&fish_type_id=" +
            data.fish
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    total_production(data) {
      return app
        .$axios({
          method: "get",
          url:
            "/caught/total_production?from=" +
            data.date_start +
            "&to=" +
            data.date_end
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    total_fisher(data) {
      return app
        .$axios({
          method: "get",
          url:
            "/caught/total_fisher?from=" +
            data.date_start +
            "&to=" +
            data.date_end
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const Auction = {
    index(data) {
      if (data.fish == null) {
        data.fish = "0";
      }
      if (data.fisherid == null) {
        data.fisherid = "0";
      }
      if (data.status == null) {
        data.status = "0";
      }
      return app
        .$axios({
          method: "get",
          url:
            "/auctions?fisher_id=" +
            data.fisherid +
            "&fish_type_id=" +
            data.fish +
            "&caught_status_id=" +
            data.status
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },

    store(data) {
      const body = {
        caught_id: parseInt(data.id),
        price: parseInt(data.price)
      };

      return app
        .$axios({
          method: "post",
          url: "/auction",
          data: body
        })
        .then(response => {
          console.log(response);
          return response;
        });
    },
    delete(data) {
      const body = {
        id: data
      };
      return app
        .$axios({
          method: "delete",
          url: "/auction/delete/" + data,
          data: body
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/auction/getbyid/" + data
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    //cek
    update(data) {
      const body = {
        id: data.id,
        weight: parseFloat(data.weight),
        weight_unit_id: parseInt(data.weight_unit_id)
      };
      return app
        .$axios({
          method: "put",
          url: "/auction/update" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    inquiry(data) {
      if (data.fish == null) {
        data.fish = "0";
      }
      if (data.fisherid == null) {
        data.fisherid = "0";
      }
      return app
        .$axios({
          method: "get",
          url:
            "/auction/inquiry?fisher_id=" +
            data.fisherid +
            "&fish_type_id=" +
            data.fish
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const Transaction = {
    index(data) {
      return app
        .$axios({
          method: "get",
          url: "/transactions"
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },

    store(data) {
      var auction = [];
      for (let index = 0; index < data.orders.length; index++) {
        auction[index] = parseInt(data.orders[index].auction_id);
      }

      const body = {
        buyer_id: parseInt(data.buyer_id),
        distribution_area: data.distribution_area,
        total_price: parseInt(data.total),
        auction_ids: auction
      };

      return app
        .$axios({
          method: "post",
          url: "/transaction",
          data: body
        })
        .then(response => {
          console.log(response);
          return response;
        });
    },
    delete(data) {
      const body = {
        id: data
      };
      return app
        .$axios({
          method: "delete",
          url: "/transaction/delete/" + data,
          data: body
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/transaction/getbyid/" + data
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    update(data) {
      const body = {
        buyer_id: parseInt(data.buyer_id),
        distribution_area: data.distribution_area
      };
      return app
        .$axios({
          method: "put",
          url: "/transaction/update/" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    total_buyer(data) {
      return app
        .$axios({
          method: "get",
          url:
            "/transaction/total_buyer?from=" +
            data.date_start +
            "&to=" +
            data.date_end
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const Fisher = {
    index() {
      return app.$axios.get("/fishers").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        nik: data.nik,
        name: data.name,
        status: data.status,
        phone_number: data.phone_number,
        address: data.address,
        ship_type: data.ship_type,
        abk_total: parseInt(data.abk_total)
      };

      return app
        .$axios({
          method: "post",
          url: "/fisher",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        });
    },
    delete(data) {
      const body = {
        id: data
      };
      return app
        .$axios({
          method: "delete",
          url: "/fisher/" + data,
          data: body
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/fisher/" + data
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    update(data) {
      const body = {
        id: data.id,
        nik: data.nik,
        name: data.name,
        status: data.status,
        phone_number: data.phone_number,
        address: data.address,
        ship_type: data.ship_type,
        abk_total: parseInt(data.abk_total)
      };
      return app
        .$axios({
          method: "put",
          url: "/fisher/" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  const Buyer = {
    index() {
      return app.$axios.get("/buyers").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        nik: data.nik,
        name: data.name,
        status: data.status,
        phone_number: data.phone_number,
        address: data.address
      };

      return app
        .$axios({
          method: "post",
          url: "/buyer",
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        });
    },
    delete(data) {
      const body = {
        id: data
      };
      return app
        .$axios({
          method: "delete",
          url: "/buyer/" + data,
          data: body
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    get_by_id(data) {
      return app
        .$axios({
          method: "get",
          url: "/buyer/" + data
        })
        .then(response => {
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    },
    update(data) {
      const body = {
        id: data.id,
        nik: data.nik,
        name: data.name,
        status: data.status,
        phone_number: data.phone_number,
        address: data.address
      };
      return app
        .$axios({
          method: "put",
          url: "/buyer/" + data.id,
          data: body
        })
        .then(response => {
          console.log(response);
          return response.data.response_data;
        })
        .catch(error => {
          throw error.response;
        });
    }
  };

  inject("api", api);
};
