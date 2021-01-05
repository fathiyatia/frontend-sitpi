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
    index() {
      return app.$axios.get("/caught_fish").then(response => {
        console.log(response);
        return response.data.response_data;
      });
    },
    store(data) {
      const body = {
        fisher_id: parseInt(data.fisherid),
        fish_type_id: parseInt(data.fish),
        weight: parseFloat(data.weight),
        weight_unit_id: parseInt(data.unit),
        fishing_gear_id: parseInt(data.gear),
        fishing_area: data.area,
        auction_weight: parseFloat(data.weightauction),
        auction_weight_unit_id: parseInt(data.unitauction)
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
        fish_type_id: parseInt(data.fish_type_id),
        weight: parseFloat(data.weight),
        weight_unit_id: parseInt(data.weight_unit_id),
        fishing_gear_id: parseInt(data.fishing_gear_id),
        fishing_area: data.fishing_area
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
    index() {
      return app.$axios.get("/auction").then(response => {
        console.log(response.data.response_data);
        return response.data.response_data;
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
    index() {
      return app.$axios.get("/transaction").then(response => {
        console.log(response);
        return response.data.response_data;
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
        address: data.address
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
        address: data.address
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
