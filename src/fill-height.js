(function (fillHeightModule) {

    fillHeightModule.directive('fillHeight', ['$window', '$document', function ($window, $document) {
        return {
            restrict: 'A',
            scope: {
                footerElementId: '@',
                additionalPadding: '@'
            },
            link: function (scope, element, attrs) {
                angular.element($window).on('resize', onWindowResize);
                onWindowResize();

                function onWindowResize() {
                    var footerElement = angular.element($document[0].getElementById(scope.footerElementId));
                    var footerElementHeight;

                    if (footerElement.length === 1) {
                        footerElementHeight = footerElement[0].offsetHeight
                              + getTopMarginAndBorderHeight(footerElement)
                              + getBottomMarginAndBorderHeight(footerElement);
                    } else {
                        footerElementHeight = 0;
                    }

                    var elementOffsetTop = element[0].offsetTop;
                    var elementBottomMarginAndBorderHeight = getBottomMarginAndBorderHeight(element);

                    var additionalPadding = scope.additionalPadding || 0;

                    var elementHeight = $window.innerHeight
                                        - elementOffsetTop
                                        - elementBottomMarginAndBorderHeight
                                        - footerElementHeight
                                        - additionalPadding;

                    console.log(elementHeight);
                    element.css('height', elementHeight + 'px');
                }

                function getTopMarginAndBorderHeight(element) {
                    var footerTopMarginHeight = getCssNumeric(element, 'margin-top');
                    var footerTopBorderHeight = getCssNumeric(element, 'border-top-width');
                    return footerTopMarginHeight + footerTopBorderHeight;
                }

                function getBottomMarginAndBorderHeight(element) {
                    var footerBottomMarginHeight = getCssNumeric(element, 'margin-bottom');
                    var footerBottomBorderHeight = getCssNumeric(element, 'border-bottom-width');
                    return footerBottomMarginHeight + footerBottomBorderHeight;
                }

                function getCssNumeric(element, propertyName) {
                    return parseInt(element.css(propertyName), 10) || 0;
                }
            }
        };
    }]);

})(angular.module("fillHeight", []))