import { addLocale } from "core-js";

export default ({ app }, inject) => {
  const api = (target, action, data, other) => {
    target = target.toLowerCase();
    action = action.toLowerCase();
    switch (target) {
      case "fish":
        switch (action) {
          case "index":
            return Fish.index(data, other);
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
      case "weight_unit":
        switch (action) {
          case "index":
            return Weight_unit.index(data, other);
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
          case "inquiry":
            return Fisher.inquiry(data, other);
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
          case "inquiry":
            return Buyer.inquiry(data, other);
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

  const Fish = {
    index() {
      return app.$axios.get("/fish_type").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    }
  };

  const Fishing_gear = {
    index() {
      return app.$axios.get("/fishing_gear").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        name: data.name
      };

      return app
        .$axios({
          method: "post",
          url: "/fishing_gear",
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
          url: "/fishing_gear/" + data,
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
          url: "/fishing_gear/" + data
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
        name: data.name
      };
      return app
        .$axios({
          method: "put",
          url: "/fishing_gear/" + data.id,
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
      return app.$axios.get("/fishing_area").then(response => {
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
          url: "/fishing_area",
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
          url: "/fishing_area/" + data,
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
          url: "/fishing_area/" + data
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
          url: "/fishing_area/" + data.id,
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

  const Weight_unit = {
    index() {
      return app.$axios.get("/weight_unit").then(response => {
        console.log(response);
        return response.data.response_data;
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
      return app
        .$axios({
          method: "get",
          url:
            "/caught_fish?from=" +
            "&to=" +
            "&fish_type_id=" +
            data.fish +
            "&fisher_id=" +
            data.fisherid
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
          weight_unit_id: parseInt(data.caughts[index].unit)
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
          url: "/caught_fish",
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
          url: "/caught_fish/" + data,
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
          url: "/caught_fish/" + data
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
        weight_unit_id: parseInt(data.weight_unit_id)
      };
      return app
        .$axios({
          method: "put",
          url: "/caught_fish/" + data.id,
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
    total_production(data) {
      return app
        .$axios({
          method: "get",
          url:
            "/caught_fish/total_production?from=" +
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
            "/caught_fish/total_fisher?from=" +
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
      if (data.fish_type_id == null) {
        data.fish_type_id = "0";
      }
      if (data.status == null) {
        data.status = "0";
      }
      return app
        .$axios({
          method: "get",
          url:
            "/auction?from=" +
            "&to=" +
            "&auction_id=" +
            data.auction +
            "&fisher_id=" +
            data.fisherid +
            "&fish_type_id=" +
            data.fish +
            "&status_id=" +
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

    inquiry() {
      return app.$axios.get("/auction/inquiry").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        weight: parseFloat(data.weightauction),
        weight_unit_id: parseInt(data.unitauction)
      };

      return app
        .$axios({
          method: "post",
          url: "/auction",
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
          url: "/auction/" + data,
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
          url: "/auction/" + data
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
        weight: parseFloat(data.weight),
        weight_unit_id: parseInt(data.weight_unit_id)
      };
      return app
        .$axios({
          method: "put",
          url: "/auction/" + data.id,
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

  const Transaction = {
    index(data) {
      if (data.fish == null) {
        data.fish = "0";
      }
      if (data.buyerid == null) {
        data.buyerid = "0";
      }
      return app
        .$axios({
          method: "get",
          url:
            "/transaction?from=" +
            "&to=" +
            "&fish_type_id=" +
            data.fish +
            "&buyer_id=" +
            data.buyerid
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
        buyer_id: parseInt(data.buyer_id),
        auction_id: parseInt(data.auction_id),
        distribution_area: data.distribution_area,
        price: parseInt(data.price)
      };

      return app
        .$axios({
          method: "post",
          url: "/transaction",
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
          url: "/transaction/" + data,
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
          url: "/transaction/" + data
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
        auction_id: parseInt(data.auction_id),
        distribution_area: data.distribution_area,
        price: parseInt(data.price)
      };
      return app
        .$axios({
          method: "put",
          url: "/transaction/" + data.id,
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
      return app.$axios.get("/fisher").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    inquiry() {
      return app.$axios.get("/fisher/inquiry").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        nik: data.nik,
        name: data.name,
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
      return app.$axios.get("/buyer").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    inquiry() {
      return app.$axios.get("/buyer/inquiry").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        nik: data.nik,
        name: data.name,
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
