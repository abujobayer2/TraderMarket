import type { FuturesPropFirmsCopy } from "@/components/content/FuturesPropFirmsContent";

export const vi: FuturesPropFirmsCopy = {
  kicker: "Hướng dẫn cho trader · Hợp đồng tương lai",
  h1: "Prop firm hợp đồng tương lai, và những quy định thực sự quyết định tài khoản của bạn",
  intro:
    "Các chương trình cấp vốn hợp đồng tương lai trông có vẻ đơn giản hơn forex — mục tiêu được chuẩn hóa, hợp đồng quen thuộc — nhưng cơ chế drawdown và thanh toán lại nghiêm ngặt hơn. Drawdown trailing, quy tắc đóng hết vị thế trước khi kết phiên, phí dữ liệu, và yêu cầu tính nhất quán là những yếu tố quyết định thắng thua trong đánh giá và thanh toán. Dưới đây là những gì khác biệt ở phân khúc hợp đồng tương lai, và cách thẩm định một công ty.",
  howItWorksHeading: "Một vòng đánh giá cấp vốn hợp đồng tương lai hoạt động như thế nào",
  howItWorksBody:
    "Bạn mua một tài khoản đánh giá có quy mô theo sức mua (50K, 100K, 150K là phổ biến), giao dịch các hợp đồng tương lai thuộc nhóm CME, và đạt mục tiêu lợi nhuận trong khi vẫn ở trên mức drawdown trailing tối đa và dưới giới hạn lỗ hàng ngày. Nhiều công ty áp dụng đánh giá một giai đoạn duy nhất, không yêu cầu lợi nhuận tối thiểu mỗi ngày để vượt qua, nhưng gắn một quy tắc nhất quán vào việc thanh toán. Sau khi được cấp vốn, ở một số công ty bạn giữ 90–100% phần lợi nhuận đầu tiên, sau đó chuyển sang tỷ lệ chia 90/10, với các khoản thanh toán theo lịch cố định.",
  drawdownHeading: "Drawdown trailing: quy định khiến hầu hết tài khoản bị đóng",
  drawdownBody:
    "Ngưỡng lỗ tối đa trượt theo đỉnh của tài khoản bạn. Ở hầu hết các công ty, nó theo dõi vốn chủ sở hữu chưa thực hiện trong ngày, vì vậy một lệnh đạt +800 đô la rồi bạn đóng ở mức +300 đô la vẫn kéo đường drawdown lên thêm 800 đô la. Nó ngừng trượt khi số dư của bạn vượt qua số dư ban đầu cộng với một khoản đệm cố định, sau đó về cơ bản trở thành tĩnh. Điều này trái ngược với forex, nơi drawdown tĩnh tính từ số dư ban đầu không bao giờ thay đổi. Nếu bạn vào/ra từng phần với các lệnh chạy dài, hãy mô phỏng phép tính trailing dựa trên những đợt biến động trong ngày tệ nhất của bạn trước khi mua.",
  flatByCloseHeading: "Đóng hết vị thế trước khi kết phiên, phí dữ liệu, và nền tảng",
  flatByCloseItems: [
    "Hầu hết các công ty yêu cầu đóng hết mọi vị thế trước khi kết phiên và trước bảo trì hàng ngày. Không giữ lệnh qua đêm là mặc định; việc giữ lệnh qua đêm thường là phần thưởng khi đạt một mốc thanh toán.",
    "Dữ liệu CME trực tiếp đi kèm phí giao dịch dành cho người không chuyên nghiệp mà hầu hết các công ty chuyển sang tài khoản được cấp vốn. Hãy cộng thêm phí nền tảng hàng tháng hay phí reset vào chi phí thực tế của bạn.",
    "Định tuyến lệnh qua Rithmic hoặc Tradovate, hiển thị qua NinjaTrader, Tradovate web, TradingView, hoặc Quantower. Lệnh khớp thông qua một nhà môi giới hợp đồng tương lai (FCM) được cấp phép.",
    "Các quy định được chuẩn hóa hơn forex vì chuỗi quản lý có quy định để lại ít khoảng trống hơn cho các công ty tự ý điều chỉnh — nhưng quy tắc nhất quán và mở rộng quy mô vẫn khác nhau nhiều.",
  ],
  dueDiligenceHeading: "Thẩm định kỹ trước khi cấp vốn cho tài khoản hợp đồng tương lai",
  dueDiligenceItems: [
    "Bằng chứng và tần suất thanh toán: hồ sơ có thể kiểm chứng, và thực tế bạn có thể rút tiền bao lâu một lần.",
    "Loại drawdown trailing: trong ngày hay cuối ngày, và nó khóa lại ở đâu.",
    "Quy tắc nhất quán: tỷ lệ phần trăm chính xác, và liệu nó áp dụng cho việc thanh toán, đánh giá, hay cả hai.",
    "Tổng chi phí: phí đánh giá + phí dữ liệu hàng tháng + phí nền tảng/reset + phí kích hoạt trên tài khoản được cấp vốn.",
    "Đánh giá độc lập từ chính các trader hợp đồng tương lai — phản hồi về forex không áp dụng được.",
  ],
  dueDiligencePrefix: "Xem",
  dueDiligenceLinkText: "hướng dẫn chương trình giao dịch được cấp vốn",
  dueDiligenceSuffix: 'để biết các bước kiểm tra chung về việc "trả tiền sau khi vượt qua đánh giá", áp dụng cho mọi công ty.',
  firmsHeading: "Các prop firm được niêm yết trên TraderMarket",
  firmsIntro:
    "Hãy mở trang đánh giá của một công ty để xem trader có bàn về quy định hợp đồng tương lai của công ty đó không — hành vi drawdown trailing, chính sách giữ lệnh qua đêm, phí dữ liệu — sau đó tự mình xác minh lịch sử thanh toán.",
  allReviewsLinkText: "Xem tất cả đánh giá prop firm →",
  faqHeading: "Prop firm hợp đồng tương lai — Câu hỏi thường gặp",
  faqs: [
    {
      q: "Prop firm hợp đồng tương lai là gì?",
      a: "Một công ty prop trading hợp đồng tương lai cấp cho trader một tài khoản đánh giá để giao dịch các hợp đồng tương lai CME, CBOT, NYMEX, hoặc COMEX — ES, NQ, GC, CL, và các hợp đồng micro. Vượt qua đánh giá bằng cách đạt mục tiêu lợi nhuận mà không chạm drawdown trailing hay giới hạn lỗ hàng ngày, sau đó giao dịch tài khoản được cấp vốn và yêu cầu thanh toán theo quy định của công ty.",
    },
    {
      q: "Drawdown trailing hoạt động như thế nào tại một prop firm hợp đồng tương lai?",
      a: "Đường giới hạn lỗ tối đa đi theo đỉnh của tài khoản bạn — thường là đỉnh vốn chủ sở hữu chưa thực hiện (trong ngày), đôi khi là số dư cuối ngày. Khi tài khoản của bạn tăng lên, drawdown trượt theo phía sau, sau đó khóa lại khi bạn vượt qua số dư ban đầu cộng với một khoản đệm cố định. Điều này nghiêm ngặt hơn drawdown tĩnh ở hầu hết các công ty forex: một vị thế đang mở tăng vọt lợi nhuận rồi quay đầu có thể đưa bạn đến gần mức vi phạm hơn ngay cả khi bạn đóng lệnh ở mức lãi.",
    },
    {
      q: "Tôi có thể giữ vị thế hợp đồng tương lai qua đêm không?",
      a: "Thường là không, ở giai đoạn đánh giá và giai đoạn đầu được cấp vốn. Hầu hết các công ty hợp đồng tương lai yêu cầu đóng hết vị thế trước khi kết phiên (và trước các khung bảo trì lớn), một số cho phép giữ lệnh qua đêm chỉ sau khi bạn đạt một mốc thanh toán hoặc nâng cấp lên tài khoản 'chuyên nghiệp'/tài khoản thực. Giữ lệnh qua thời điểm kết phiên trên một tài khoản không-qua-đêm thường là vi phạm quy định ngay lập tức.",
    },
    {
      q: "Tôi có phải trả phí dữ liệu thị trường khi giao dịch với một prop firm hợp đồng tương lai không?",
      a: "Thường là có. Dữ liệu CME trực tiếp cho trader không chuyên nghiệp đi kèm phí giao dịch (khoảng 10–15 đô la cho mỗi gói sàn mỗi tháng) mà hầu hết các công ty chuyển sang tài khoản được cấp vốn. Tài khoản đánh giá đôi khi bao gồm dữ liệu trễ hoặc do công ty tài trợ. Hãy dự trù ngân sách cho dữ liệu và bất kỳ phí nền tảng/reset hàng tháng nào, không chỉ giá đánh giá.",
    },
    {
      q: "Prop firm hợp đồng tương lai sử dụng nền tảng nào?",
      a: "Rithmic và Tradovate là hai nền tảng định tuyến lệnh chính, được hiển thị qua NinjaTrader, nền tảng web riêng của Tradovate, TradingView, Quantower, hoặc R|Trader. Lệnh khớp và lãi/lỗ của bạn được định tuyến qua một nhà môi giới hợp đồng tương lai được cấp phép, đây là một trong những lý do khiến quy định của các công ty hợp đồng tương lai thường được chuẩn hóa hơn forex.",
    },
    {
      q: "Quy tắc nhất quán là gì và tại sao nó quan trọng đối với việc thanh toán?",
      a: "Quy tắc nhất quán giới hạn tỷ lệ phần trăm mà một ngày duy nhất có thể chiếm trong tổng lợi nhuận của bạn — thường là 20–40%. Nó được thiết kế để ngăn một trader vượt qua đánh giá chỉ nhờ một ngày may mắn. Quy tắc này thường áp dụng cho điều kiện được thanh toán hơn là bản thân đánh giá, vì vậy bạn có thể vượt qua đánh giá nhưng vẫn bị chặn rút tiền cho đến khi lợi nhuận của bạn được trải đều ra nhiều ngày hơn. Hãy đọc kỹ tỷ lệ phần trăm chính xác và liệu nó được đo trên đánh giá, tài khoản được cấp vốn, hay cả hai.",
    },
  ],
  relatedHeading: "Hướng dẫn liên quan",
  relatedForex: "Prop firm forex",
  relatedCrypto: "Prop firm tiền mã hóa",
  relatedBest: "Prop firm tốt nhất",
  relatedReviews: "Đánh giá prop firm",
  relatedCountry: "Prop firm theo quốc gia",
};
